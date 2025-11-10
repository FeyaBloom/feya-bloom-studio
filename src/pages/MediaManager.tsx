import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2, Copy, Check, Search } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";

interface MediaFile {
  name: string;
  url: string;
}

const MediaManager = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadFiles();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roles) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  };

  const loadFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from('media')
        .list();

      if (error) throw error;

      const filesWithUrls = (data || []).map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: publicUrl
        };
      });

      setFiles(filesWithUrls);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([fileName]);

      if (error) throw error;

      toast.success('File deleted successfully');
      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete file');
    } finally {
      setDeleteTarget(null);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-mystic">
        <p className="text-xl text-white">Loading media...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystic">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-serif text-white">Media Manager</h1>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="p-6 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <ImageUploader
            label="Upload Media"
            value=""
            onChange={(url) => {
              toast.success('File uploaded!');
              loadFiles();
            }}
            preview={false}
          />
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card 
              key={file.name} 
              className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="aspect-video bg-black/20 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={file.url} 
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-white truncate">
                  {file.name}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(file.url)}
                    className="flex-1 gap-2"
                  >
                    {copiedUrl === file.url ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteTarget(file.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              {searchQuery ? 'No files found' : 'No files uploaded yet'}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteTarget(null)}>
          <Card className="p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete File?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteTarget)} className="flex-1">
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MediaManager;