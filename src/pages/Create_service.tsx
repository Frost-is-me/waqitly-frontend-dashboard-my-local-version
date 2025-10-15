
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect} from "react"
import { ArrowLeft, X } from 'lucide-react';
import axios from "axios";
function Create_service() {

  const isArabic = document.documentElement.dir === "rtl";
  const isRTL = document.documentElement.dir = isArabic ? "rtl" : "ltr";
  const [images, setImages] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [duration, setDuration] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const MaxImages = 10
  useEffect(() => {
  if (selectedSpace?.images) {
    setPreview(selectedSpace.images);
  } else {
    setPreview([]);
  }
}, [selectedSpace]);
  const spaces = [
  {
    id: 1,
    name: "Conference Room A",
    price: "25,000",
    capacity: 10,
    floor: "2nd Floor",
    size: "4 x 4",
    description: "A modern conference room with video conferencing",
    duration: "2",
    images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"]
  },
  {
    id: 2, 
    name: "Private Office B",
    price: "15,000",
    capacity: 4,
    floor: "3rd Floor", 
    size: "3 x 3",
    description: "Quiet private office for focused work",
    duration: "4",
    images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"]
  },
  {
    id: 3, 
    name: "Private Office B",
    price: "15,000",
    capacity: 4,
    floor: "3rd Floor", 
    size: "3 x 3",
    description: "Quiet private office for focused work",
    duration: "4",
    images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"]
  },
  {
    id: 4, 
    name: "Private Office B",
    price: "15,000",
    capacity: 4,
    floor: "3rd Floor", 
    size: "3 x 3",
    description: "Quiet private office for focused work",
    duration: "4",
    images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"]
  }
];

  const handelChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      if (preview.length + selectedFiles.length > MaxImages) {
      alert(`Maximum ${MaxImages} images allowed`);
      return;
      }

      setImages(item => item.concat(selectedFiles))
      const ImagePreview = selectedFiles.map(file => URL.createObjectURL(file))
      setPreview(item => item.concat(ImagePreview))
    }
  }
  const RemoveImage = (index: number) => {
    URL.revokeObjectURL(preview[index])

    const newImages = images.filter((_,i) => i !== index)
    const newPreview = preview.filter((_,i) => i !== index)

    setImages(newImages)
    setPreview(newPreview)

    if(fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
    const formData = new FormData(e.currentTarget)
    images.forEach(image => {
      formData.append("images", image)
    })
    formData.append("duration", duration)
    const response = await axios.post("api/spaces", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    console.log("Response:", response.data)
    e.currentTarget.reset()
      setImages([])
      setPreview([])
      setDuration("")
      setShowForm(false)
      setSelectedSpace(null)
  } catch (error) {
    console.error("Error submitting form:", error)
  }
} 
  return (
    <div className={`min-h-screen ${ isRTL ? "rtl" : "ltr"}`}> 
      <div className="flex flex-col md:flex-row">    
        {/* Main Content Area */}
        <div className="flex-1 space-y-8 ">
        {!showForm ? (
          <div className="w-full max-w-none px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Spaces</h1>
                <p className="text-muted-foreground mt-4 ">Manage your bookable spaces and services</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowForm(true)} 
                className="bg-brand-blue text-white border-1 dark:border-muted-foreground border-border dark:hover:bg-accent px-10 py-4 rounded-2xl text-lg "
              >
                + Add New Space
              </Button>
            </div>
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {spaces.map((space: any) => (
                <Card key={space.id} className="cursor-pointer bg-card border-2 border-border hover:border-accent hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden min-h-[500px]">
                  <CardContent className="p-10 h-full flex flex-col">
                    <h3 className="font-bold text-3xl text-card-foreground mb-8 text-center">{space.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8 flex-grow-0">
                      {space.images.slice(0, 2).map((img: string, index: number) => (
                        <img 
                          key={index}
                          className="w-full h-60 object-cover rounded-2xl"
                          src={img} 
                          alt={`Space ${index + 1}`} 
                        />
                      ))}
                    </div>
                    <div className="space-y-6 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-brand-blue">IQD {space.price}/hr</span>
                        <span className="text-muted-foreground bg-muted px-5 py-3 rounded-full text-lg font-semibold">
                          {space.capacity} people
                        </span>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{space.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-8 border-2 border-border text-muted-foreground dark:hover:bg-accent text-xl font-semibold py-4 rounded-2xl cursor-pointer"
                      onClick={() => {setSelectedSpace(space); setShowForm(true)}}
                    >
                      Edit Space
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-start mb-4">
          <Button variant="outline" className="bg-brand-blue text-white dark:hover:bg-accent dark:hover:text-accent-foreground" type="button" onClick={() => {setShowForm(false); setSelectedSpace(null)}}>
            <ArrowLeft /> Go back
          </Button>
          </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 bg-card">
            <CardHeader className="bg-card">
              <CardTitle>Space Information</CardTitle>
              <CardDescription>Essential details about your space</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 bg-card">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Space Name</Label>
                  <Input name="name" id="name" placeholder="e.g., Conference Room A" required defaultValue={selectedSpace?.name || ""}/>
                </div>
                <div className="space-y-2">
                <Label htmlFor="price">Price per Hour</Label>
                <Input name="price" id="price" placeholder="e.g., 25,000" required min={1} type="text"
                    defaultValue={selectedSpace?.price || ""}
                    className="[&::-webkit-inner-spin-button]:appearance-none" 
                    onChange={(e) => {
                    const value = e.target.value.replace(/[^\d]/g, '');
                    e.target.value = new Intl.NumberFormat().format(Number(value));
                  }}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input name="capacity" id="capacity" type="number" placeholder="e.g., 10 people" min="1" required defaultValue={selectedSpace?.capacity || ""}/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input name="floor" id="floor" placeholder="e.g., 2nd Floor" required defaultValue={selectedSpace?.floor || ""}/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input name="size" id="size" placeholder="e.g., 4 x 4" required defaultValue={selectedSpace?.size || ""}/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="images">Images ({preview.length}/{MaxImages})</Label>
                  <Input
                  disabled={images.length >= MaxImages}
                  id="images"
                  name="images"
                  placeholder="Upload an image"
                  required 
                  type="file"
                  multiple
                  max={10}
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handelChangeImage}
                    />
                    {images.length >= MaxImages && (
                      <p className="text-sm text-destructive">Maximum {MaxImages} images reached</p>
                    )}
              </div>
              <div className="space-y-2 md:col-span-2">
                  {preview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                      {preview.map((preview, index) => (
                        <div key={index} className="relative aspect-square">
                          <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg"/>
                          <Button type="button"
                          className="absolute -top-2 -end-2 bg-destructive text-white hover:bg-destructive/90 rounded-full w-5 h-5 text-xs"
                          onClick={() => RemoveImage(index)}
                           > <X  className="w-5 h-5"/>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Describe your service or space..."
                  rows={4}
                  maxLength={800}
                  required
                  defaultValue={selectedSpace?.description || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Minimum Duration in hours (optional)</Label>
                <Select value={duration || selectedSpace?.duration || ""} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="8">Full day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="flex justify-end pr-4">
              <Button type="submit" className="bg-brand-blue hover:bg-accent hover:text-accent-foreground">Create Service</Button>
            </div>
          </Card>
          </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}
export default Create_service;