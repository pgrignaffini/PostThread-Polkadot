import React, { useState } from 'react'
import Comments from '../Buttons/Comments'
import ThumbsDown from '../Buttons/ThumbsDown'
import ThumbsUp from '../Buttons/ThumbsUp'
import { isImage } from '../../utils/Utils'
import { randomIntFromInterval } from '../../utils/Utils'
import Link from 'next/link'

export default function Post({ post }) {

    const [showImage, setShowImage] = useState(true)
    const username = post.username === "removed" ? "Username" : post.username
    const randomPersonNumber = randomIntFromInterval(3, 10)
    const profilePic = post.profile_pic === "removed" ? `https://www.tailwind-kit.com/images/person/${randomPersonNumber}.jpg` : post.profile_pic
    const body = post.body
    const randomImageNumber = randomIntFromInterval(1, 6)
    const imageSrc = `https://www.tailwind-kit.com/images/blog/${randomImageNumber}.jpg`
    const image = post.url ? post.url : imageSrc


    const onError = () => {
        setShowImage(false);
    }

    return (
        <div className="flex w-full p-8 border-b border-gray-300">
            <span className="flex-shrink-0 w-12 h-12 bg-primary-400 rounded-full">
                <img alt="profil" src={profilePic}
                    className="mx-auto object-cover rounded-full" />
            </span>
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex">
                    <span className="font-semibold">@{username}</span>
                    <span className="ml-auto text-sm">{post.date_minted}</span>
                </div>
                {isImage(image) ? <p className="font-bold">{post.title}</p> : <Link href={image}><a className="font-bold">{post.title}</a></Link>}
                <p className="mt-1">{body}</p>
                <div className="flex items-center justify-center h-64 mt-2 bg-primary-200">
                    {isImage(image) ? (showImage ?
                        <img alt="image" onError={onError} src={image} className="flex items-center justify-center h-64 " />
                        : <img alt="image-not-found" src="./not-found.png" className="flex items-center justify-center h-64 " />
                    ) : ""
                    }
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <ThumbsUp upvotes={post.upvotes} />
                    <ThumbsDown downvotes={post.downvotes} />
                    <Comments numberOfComments={post.num_comments} />
                    <p className="font-bold">#{post.category}</p>
                </div>
            </div>
        </div>
    )
}
