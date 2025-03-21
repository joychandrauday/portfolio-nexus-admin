/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useEffect, useState } from 'react'
import Editor from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useUploadImage from '@/hooks/useUploadImage' // Import the custom hook for uploading
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { addBlog } from '@/service/blog'
import { toast } from 'sonner'
import { ICategory } from '@/types'

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

export default function ContentForm({ categories = [] }: { categories: ICategory[] }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState<string>('')
  const [pending, setPending] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string>('') // Featured image field
  const [category, setCategory] = useState('') // Category field
  const [tags, setTags] = useState<string[]>([]) // Tags field
  const [estimatedReadTime, setEstimatedReadTime] = useState<number>(0) // Estimated read time field
  const [metaDescription, setMetaDescription] = useState('') // Meta description field
  const { uploadImage, isLoading, error, imageUrl } = useUploadImage(); // Using the custom hook
  const session = useSession()
  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    setSlug(name)
  }, [title])

  useEffect(() => {
    if (imageUrl) {
      setFeaturedImage(imageUrl); // Update featured image URL after successful upload
    }
  }, [imageUrl]);

  async function handleSubmit() {
    setPending(true);

    // Validate required fields
    if (!title || !slug || !content || !category) {
      console.error("All required fields must be filled!");
      setPending(false);
      return;
    }

    // Blog data structure
    const blogData = {
      title: title,
      slug: slug,
      content: content,
      author: session.data?.user?.id,
      category: category,
      tags: tags,
      estimatedReadTime: estimatedReadTime,
      metaDescription: metaDescription,
      featuredImage: featuredImage,
    };

    try {
      await addBlog(blogData)
      toast.success('blog added successfully!')
    } catch (error) {
      console.error("Error submitting blog:");
    } finally {
      setPending(false);
    }
  }


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the FileList
    if (file) {
      const fileList = { 0: file, length: 1, item: (__index: number) => file } as unknown as FileList; // Create a fake FileList
      await uploadImage(fileList); // Pass the fake FileList to the uploadImage function
    }
  };



  return (
    <div className='mt-6 flex w-full flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Slug'
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
      </div>

      <div className='flex gap-4'>
        {/* Featured Image File Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="featuredImage" className="font-medium">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          {isLoading && <p>Uploading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {featuredImage && <Image width={100} height={100} src={featuredImage} alt="Featured" className="mt-2 h-32 w-32 object-cover" />}
        </div>
      </div>

      <div className='flex gap-4'>
        {/* Category Dropdown */}
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="" disabled>Select a category</option>
          {(categories || []).map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>


        {/* Tags Input */}
        <Input
          type='text'
          placeholder='Tags (comma separated)'
          value={tags.join(', ')}
          onChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />
      </div>


      <div className='flex gap-4'>
        <Input
          type='number'
          placeholder='Estimated Read Time (in minutes)'
          value={estimatedReadTime}
          onChange={e => setEstimatedReadTime(Number(e.target.value))}
        />
        <Input
          type='text'
          placeholder='Meta Description (max 160 characters)'
          value={metaDescription}
          onChange={e => setMetaDescription(e.target.value)}
        />
      </div>

      <Editor initialValue={defaultValue} onChange={setContent} />

      <Button onClick={handleSubmit} disabled={pending}>
        {pending ? 'Submitting...' : 'Create'}
      </Button>
    </div>
  )
}
