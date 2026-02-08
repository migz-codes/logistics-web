'use client'

import { useState } from 'react'

interface GalleryImage {
    url: string
    alt: string
}

const defaultImages: GalleryImage[] = [
    {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvGyGFgcHLM3-ftoekoKy2glBv00OtBj2STSGiqZWZjtFesJpDQU30Z5OWMvQXUcLXsJoZE89Xt2Iob-YZBONI3OWH1n4OpJlXnMT-LRl71wJzcEgysiXMYHXMBZaMAzfcNEiaSLaTNwGeOJWg6buJ_dxpkFQQS8xEEPO3cxH_w7C_vfdIouuVLv_-rFzyxDenO3zBa17B3jLTKJRfYMm8fHzHEwQQg1dOBXjNFdoRFn-1UwLo4ANs7S_Cxo4pMpvdkBOlmT9ZmiE',
        alt: 'Warehouse Exterior Main'
    },
    {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcKR8hM-rllk9n4fDVAv1yZ0s2dCnqZmdgZvVqDvhARcCMehqe5vH6Y2_43yo92RdWGBXCGsMZkmqDHfXNIMtrkA5QZS6nwsXcn-bE7trWl7VuzuezBG-02nJWcoagBvUnfZ06_O__rUF5g2sckccAsGEv36SvQWeAO4KPtuvp1g-FOkNg6fc3O8PQ9QxEKKa0AThg1rtnTHzSlCGuJ0IQgihrGluBrtYUebb7N3tOufK1fzr6XUjDyNmSIl5--x1LCNjD9nEF18',
        alt: 'Interior View'
    },
    {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuYEXj-i7PhFEfcbTeHMM3JMmYpiLkoWs898M2vjfQ-FbDZlaxdiGM36O7FHKUvyGd7dgn9vtDDmMyX5fR0aVy075mfAqWPyC1TjCq8j0vdz6obAme6bfCZ68HDSc3BgNYScHu3i9ReR5DwC1wQCJ9cXUJs3llPLUkDt97o8G2wY4yY3cvc296_paXHS5GwQicdWAF1WWgKEVXNe1nLzspwzbHOhVBBDE2H5nqyAKYjo-Lq7ZlOrc3tzJnvVQ27lHMQSLVOXpvDDM',
        alt: 'Loading Docks'
    },
    {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOa8d7BN6OttSwmAPIztKImxQB8rgSgZYGotKIb-PTro-Y-N_Do7h_x2iWE_h0WLLHCppjDWHEsbRUVsHe3LWoX1ibEgUxO6e3BJmUcSIOUYE2HPeQjRqHpiE4pXoIKzksZNNJNiVy9X3GZpmgLKJOfR2zCjIM3YamZ0z8dDR1m5of0KB162a_iq82d296NGc08KsggmcsDm6ysjyybBSgm5wpA6awrhJegXswdR2V83AFjzVIpcUqdr_Co6viBSAL4TZUZWB7uzo',
        alt: 'Office Space'
    }
]

interface PropertyGalleryProps {
    images?: GalleryImage[]
    moreCount?: number
}

export function PropertyGallery({
    images = defaultImages,
    moreCount = 12
}: PropertyGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <section className="space-y-4">
            {/* Main Image */}
            <div className="w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                    alt={images[selectedImage]?.alt}
                    className="w-full h-full object-cover"
                    src={images[selectedImage]?.url}
                />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`h-32 rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedImage === index
                                ? 'ring-4 ring-primary'
                                : 'hover:opacity-80'
                            }`}
                        onClick={() => setSelectedImage(index)}
                    >
                        {index === images.length - 1 && moreCount > 0 ? (
                            <div className="relative h-full">
                                <img
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                    src={image.url}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-white font-bold">+{moreCount}</span>
                                </div>
                            </div>
                        ) : (
                            <img
                                alt={image.alt}
                                className="w-full h-full object-cover"
                                src={image.url}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
