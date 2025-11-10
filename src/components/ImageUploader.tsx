import { useState, useId } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MediaPicker } from "./MediaPicker";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  preview?: boolean;
  multiple?: boolean;
  onMultipleChange?: (urls: string[]) => void;
}

export const ImageUploader = ({ value, onChange, label, preview = true, multiple = false, onMultipleChange }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const { toast } = useToast();
  const uniqueId = useId();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError, data } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple && onMultipleChange) {
      // Upload multiple files
      setUploading(true);
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Ошибка",
            description: `${file.name} слишком большой (макс. 10MB)`,
            variant: "destructive",
          });
          continue;
        }

        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const filePath = fileName;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          uploadedUrls.push(publicUrl);
        } catch (error: any) {
          toast({
            title: "Ошибка",
            description: `${file.name}: ${error.message}`,
            variant: "destructive",
          });
        }
      }

      if (uploadedUrls.length > 0) {
        onMultipleChange(uploadedUrls);
        toast({
          title: "Успешно",
          description: `Загружено ${uploadedUrls.length} изображений`,
        });
      }
      setUploading(false);
    } else {
      // Upload single file
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Ошибка",
          description: "Файл слишком большой (макс. 10MB)",
          variant: "destructive",
        });
        return;
      }
      uploadImage(file);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={uniqueId}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(uniqueId)?.click()}
          disabled={uploading}
          className="flex-1"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Загрузка...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Загрузить
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowMediaPicker(true)}
          disabled={uploading}
          className="flex-1"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Из базы
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={removeImage}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {preview && value && (
        <div className="relative">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full max-h-60 object-cover rounded-lg border"
          />
        </div>
      )}

      <MediaPicker
        open={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => onChange(url)}
        acceptTypes={['image']}
      />
    </div>
  );
};
