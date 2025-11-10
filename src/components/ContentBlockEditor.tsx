import { useState } from "react";
import { ContentBlock } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash, GripVertical, Plus, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUploader } from "@/components/ImageUploader";
import { MediaPicker } from "@/components/MediaPicker";

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const ContentBlockEditor = ({ blocks, onChange }: ContentBlockEditorProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState<number | null>(null);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      type,
      content: type === "gallery" ? [] : "",
      caption: "",
      href: ""
    };
    onChange([...blocks, newBlock]);
    setShowAddMenu(false);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    onChange(newBlocks);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  const addImageToGallery = (blockIndex: number, url: string) => {
    const block = blocks[blockIndex];
    if (block.type === "gallery" && Array.isArray(block.content)) {
      updateBlock(blockIndex, {
        content: [...block.content, url]
      });
    }
  };

  const addMultipleImagesToGallery = (blockIndex: number, urls: string[]) => {
    const block = blocks[blockIndex];
    if (block.type === "gallery" && Array.isArray(block.content)) {
      updateBlock(blockIndex, {
        content: [...block.content, ...urls]
      });
    }
  };

  const removeImageFromGallery = (blockIndex: number, imageIndex: number) => {
    const block = blocks[blockIndex];
    if (block.type === "gallery" && Array.isArray(block.content)) {
      updateBlock(blockIndex, {
        content: block.content.filter((_, i) => i !== imageIndex)
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Content Blocks</Label>
        <Button 
          type="button" 
          size="sm" 
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
      </div>

      {showAddMenu && (
        <Card className="p-4 grid grid-cols-3 gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("text")}>
            Text
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("image")}>
            Image
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("gallery")}>
            Gallery
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("video")}>
            Video
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("quote")}>
            Quote
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("button")}>
            Button
          </Button>
        </Card>
      )}

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <Card key={index} className="p-4 space-y-3 bg-card/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary">{block.type}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(index, "down")}
                  disabled={index === blocks.length - 1}
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBlock(index)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            {block.type === "text" && (
              <Textarea
                placeholder="Enter text content..."
                value={block.content as string}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                rows={4}
              />
            )}

            {block.type === "image" && (
              <>
                <ImageUploader
                  value={block.content as string}
                  onChange={(url) => updateBlock(index, { content: url })}
                  preview={true}
                />
                <Input
                  placeholder="Caption (optional)"
                  value={block.caption || ""}
                  onChange={(e) => updateBlock(index, { caption: e.target.value })}
                />
              </>
            )}

            {block.type === "gallery" && (
              <>
                <ImageUploader
                  value=""
                  onChange={(url) => addImageToGallery(index, url)}
                  preview={false}
                  multiple={true}
                  onMultipleChange={(urls) => addMultipleImagesToGallery(index, urls)}
                  label="Добавить изображения (можно выбрать сразу несколько)"
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {Array.isArray(block.content) && block.content.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative group">
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full aspect-square object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={() => removeImageFromGallery(index, imgIdx)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {block.type === "video" && (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Video embed URL (YouTube, Vimeo, или прямая ссылка)"
                    value={block.content as string}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowVideoPicker(index)}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Из базы
                  </Button>
                </div>
                {block.content && (
                  <div className="aspect-video rounded overflow-hidden">
                    <iframe
                      src={block.content as string}
                      className="w-full h-full"
                      allowFullScreen
                      title="Video preview"
                    />
                  </div>
                )}
              </>
            )}

            {block.type === "quote" && (
              <Textarea
                placeholder="Enter quote text..."
                value={block.content as string}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                rows={3}
              />
            )}

            {block.type === "button" && (
              <>
                <Input
                  placeholder="Button text"
                  value={block.content as string}
                  onChange={(e) => updateBlock(index, { content: e.target.value })}
                />
                <Input
                  placeholder="Button URL"
                  value={block.href || ""}
                  onChange={(e) => updateBlock(index, { href: e.target.value })}
                />
              </>
            )}
          </Card>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No content blocks yet. Click "Add Block" to get started.
        </div>
      )}

      {showVideoPicker !== null && (
        <MediaPicker
          open={true}
          onClose={() => setShowVideoPicker(null)}
          onSelect={(url) => {
            updateBlock(showVideoPicker, { content: url });
            setShowVideoPicker(null);
          }}
          acceptTypes={['video']}
        />
      )}
    </div>
  );
};

export default ContentBlockEditor;
