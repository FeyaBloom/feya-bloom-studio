import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Project } from "@/types/project";
import ContentBlockEditor from "@/components/ContentBlockEditor";
import { ImageUploader } from "@/components/ImageUploader";

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
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
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  // Get all projects
  const { data: projects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(p => ({
        ...p,
        content: p.content as any,
        links: p.links as any
      })) as Project[];
    },
    enabled: isAdmin
  });

  // Save project
  const saveMutation = useMutation({
    mutationFn: async (project: Project) => {
      // Transform Project to database format
      const dbProject = {
        ...project,
        content: project.content as any,
        links: project.links as any
      };
      
      if (project.id) {
        const { error } = await supabase
          .from('projects')
          .update(dbProject)
          .eq('id', project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([dbProject]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsEditing(false);
      setCurrentProject(null);
      toast.success('Project saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save project');
    }
  });

  // Delete project
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete project');
    }
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-mystic">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-serif">Project Admin</h1>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <Button onClick={() => {
                setCurrentProject({ 
                  title: '', 
                  main_category: 'Digital Experiences',
                  category: '', 
                  short_description: '',
                  cover_image: '',
                  year: '',
                  tags: [],
                  content: [],
                  links: {},
                  published: false,
                  order_index: 0
                });
                setIsEditing(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {isEditing ? (
          <ProjectForm 
            project={currentProject!}
            onSave={(data) => saveMutation.mutate(data)}
            onCancel={() => {
              setIsEditing(false);
              setCurrentProject(null);
            }}
          />
        ) : (
          <div className="grid gap-4">
            {projects?.map(project => (
              <Card key={project.id} className="p-4 flex justify-between items-center bg-white/10 backdrop-blur-sm border-white/20">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.published ? (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Published</span>
                    ) : (
                      <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded">Draft</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.main_category} {project.category && `→ ${project.category}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentProject(project);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        deleteMutation.mutate(project.id!);
                      }
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectFormProps {
  project: Project;
  onSave: (data: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState<Project>(project);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index)
    });
  };

  return (
    <Card className="p-6 space-y-6 bg-white/10 backdrop-blur-sm border-white/20">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Project title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="main_category">Main Category *</Label>
        <select
          id="main_category"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.main_category || ''}
          onChange={(e) => setFormData({...formData, main_category: e.target.value})}
        >
          <option value="Fiber Arts">Fiber Arts</option>
          <option value="Tactile Dreams">Tactile Dreams</option>
          <option value="Visual Works">Visual Works</option>
          <option value="Digital Experiences">Digital Experiences</option>
          <option value="Written Worlds">Written Worlds</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Subcategory</Label>
        <Input
          id="category"
          placeholder="e.g. Web Design, Macramé, Photography"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea
          id="short_description"
          placeholder="Brief description for gallery card"
          value={formData.short_description || ''}
          onChange={(e) => setFormData({...formData, short_description: e.target.value})}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ImageUploader
          label="Cover Image"
          value={formData.cover_image || ''}
          onChange={(url) => setFormData({...formData, cover_image: url})}
          preview={true}
        />
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            placeholder="e.g. 2024"
            value={formData.year || ''}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
          />
        </div>
      </div>

      <ContentBlockEditor
        blocks={formData.content || []}
        onChange={(content) => setFormData({...formData, content})}
      />

      <div className="space-y-2">
        <Label>Project Links</Label>
        <div className="grid gap-2">
          <Input
            placeholder="Demo URL"
            value={formData.links?.demo || ''}
            onChange={(e) => setFormData({
              ...formData, 
              links: { ...formData.links, demo: e.target.value }
            })}
          />
          <Input
            placeholder="GitHub URL"
            value={formData.links?.github || ''}
            onChange={(e) => setFormData({
              ...formData, 
              links: { ...formData.links, github: e.target.value }
            })}
          />
          <Input
            placeholder="Purchase/Buy URL"
            value={formData.links?.buy || ''}
            onChange={(e) => setFormData({
              ...formData, 
              links: { ...formData.links, buy: e.target.value }
            })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Tag name"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags?.map((tag, i) => (
            <span key={i} className="bg-primary/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({...formData, published: checked})}
        />
        <Label htmlFor="published">Publish project</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="order_index">Display Order</Label>
        <Input
          id="order_index"
          type="number"
          placeholder="0"
          value={formData.order_index || 0}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value) || 0})}
        />
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button onClick={() => onSave(formData)} disabled={!formData.title || !formData.main_category}>
          Save Project
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </Card>
  );
};

export default Admin;
