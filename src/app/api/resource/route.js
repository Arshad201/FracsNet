import { BlogPost } from "@/lib/models/blogModel";
import { Comment } from "@/lib/models/commentModel";
import { Job } from "@/lib/models/jobModel";
import { Poll } from "@/lib/models/pollModel";
import { Reply } from "@/lib/models/replyModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { deleteAssetsFromCloudinary } from "@/lib/utils/CloudinaryUpload";
import { NextResponse } from "next/server";


function isValidObjectId(id) {
    const objectIdPattern = /^[a-fA-F0-9]{24}$/;
    return objectIdPattern.test(id);
}

export const GET = async (req, { params }) => {

    try {

        connectToDB();

        const resourceType = req.nextUrl.searchParams.get('resourceType');
        const resource_id = req.nextUrl.searchParams.get('resource_id');



        if (!isValidObjectId(resource_id)) return { error: "Invalid Object ID" }

        let data;

        if (resourceType === "thread") {

            data = await Thread.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return NextResponse.json({
                data
            }, {
                status: 200
            })

        }

        if (resourceType === "poll") {

            data = await Poll.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return NextResponse.json({
                data
            }, {
                status: 200
            })

        }

        if (resourceType === "job") {

            data = await Job.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return NextResponse.json({
                data
            }, {
                status: 200
            })

        }

        if (resourceType === "blogpost") {

            data = await BlogPost.findOne({ _id: resource_id });

            if (!data) return { error: "Resource not found" }

            return NextResponse.json({
                data
            }, {
                status: 200
            })

        }


    } catch (error) {

        return NextResponse.json({
            error: error.message
        }, {
            status: 200
        })
    }

}

export const DELETE = async (req, { params }) => {


    try {

        connectToDB();

        const resourceType = req.nextUrl.searchParams.get('resourceType');
        const resource_id = req.nextUrl.searchParams.get('resource_id');


        if (!isValidObjectId(resource_id)) return { error: "Invalid Object ID" }

        let data;

        if (resourceType === "thread") {


            data = await Thread.findById(resource_id).populate({
                path: 'comments',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            })


            const threadImages = data.threadImage
            const threadVideos = data.threadVideo
            const threadFiles = data.files
            const comments = data.comments

            // Delete thread images from cloudinary
            threadImages?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            // Delete thread videos from cloudinary
            threadVideos?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            // Delete thread files from cloudinary
            threadFiles?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            comments.forEach(async comment => {

                // Delete Comment Image
                if (comment.commentImage?.public_id) {
                    await deleteAssetsFromCloudinary(comment.commentImage.public_id)
                }

                comment.replies?.forEach(async reply => {

                    // Delete Reply Image
                    if (reply.replyImage?.public_id) {
                        await deleteAssetsFromCloudinary(reply.replyImage?.public_id)
                    }

                });

            });

            const commentIds = comments.map(comment => comment._id);


            const replyIds = comments.map(comment => {

                const reply = comment.replies.map(reply => reply._id)

                return reply

            }).flat()

            // Delete Comments
            await Comment.deleteMany({
                _id: { $in: commentIds }
            })

            // Delete Comments
            await Reply.deleteMany({
                _id: { $in: replyIds }
            })

            await Thread.deleteOne({ _id: resource_id })

        }

        if (resourceType === "poll") {

            data = await Poll.findById(resource_id).populate({
                path: 'comments',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            })

            const comments = data.comments

            comments.forEach(async comment => {

                // Delete Comment Image
                if (comment.commentImage?.public_id) {
                    await deleteAssetsFromCloudinary(comment.commentImage.public_id)
                }

                comment.replies?.forEach(async reply => {

                    // Delete Reply Image
                    if (reply.replyImage?.public_id) {
                        await deleteAssetsFromCloudinary(reply.replyImage?.public_id)
                    }

                });

            });

            const commentIds = comments.map(comment => comment._id);


            const replyIds = comments.map(comment => {

                const reply = comment.replies.map(reply => reply._id)

                return reply

            }).flat()

            // Delete Comments
            await Comment.deleteMany({
                _id: { $in: commentIds }
            })

            // Delete Comments
            await Reply.deleteMany({
                _id: { $in: replyIds }
            })

            await Poll.deleteOne({ _id: resource_id })

        }

        if (resourceType === "job") {

            data = await Job.findById(resource_id).populate({
                path: 'applicants',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            })


            const images = data.images
            const files = data.files
            const comments = data.applicants

            // Delete thread images from cloudinary
            images?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            // Delete thread files from cloudinary
            files?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            comments.forEach(async comment => {

                // Delete Comment Image
                if (comment.commentImage?.public_id) {
                    await deleteAssetsFromCloudinary(comment.commentImage.public_id)
                }

                comment.replies?.forEach(async reply => {

                    // Delete Reply Image
                    if (reply.replyImage?.public_id) {
                        await deleteAssetsFromCloudinary(reply.replyImage?.public_id)
                    }

                });

            });

            const commentIds = comments.map(comment => comment._id);


            const replyIds = comments.map(comment => {

                const reply = comment.replies.map(reply => reply._id)

                return reply

            }).flat()

            // Delete Comments
            await Comment.deleteMany({
                _id: { $in: commentIds }
            })

            // Delete Comments
            await Reply.deleteMany({
                _id: { $in: replyIds }
            })

            await Job.deleteOne({ _id: resource_id })

        }

        if (resourceType === "blogpost") {

            data = await BlogPost.findById(resource_id).populate({
                path: 'comments',
                populate: {
                    path: 'replies',
                    model: 'Reply'
                }
            })


            const featuredImage = data.featuredImage
            const images = data.images
            const comments = data.comments

            // Delete featured image from cloudinary
            await deleteAssetsFromCloudinary(featuredImage.public_id)

            // Delete images from cloudinary
            images?.forEach(async item => {
                await deleteAssetsFromCloudinary(item.public_id)
            });

            comments.forEach(async comment => {

                // Delete Comment Image
                if (comment.commentImage?.public_id) {
                    await deleteAssetsFromCloudinary(comment.commentImage.public_id)
                }

                comment.replies?.forEach(async reply => {

                    // Delete Reply Image
                    if (reply.replyImage?.public_id) {
                        await deleteAssetsFromCloudinary(reply.replyImage?.public_id)
                    }

                });

            });

            const commentIds = comments.map(comment => comment._id);


            const replyIds = comments.map(comment => {

                const reply = comment.replies.map(reply => reply._id)

                return reply

            }).flat()

            // Delete Comments
            await Comment.deleteMany({
                _id: { $in: commentIds }
            })

            // Delete Comments
            await Reply.deleteMany({
                _id: { $in: replyIds }
            })

            await BlogPost.deleteOne({ _id: resource_id })

        }

        if (resourceType === "comment") {

            // Remove Comment ids from Post

            let post;

            post = await Thread.findOne({ comments: { $in: resource_id } })

            if (!post) {
                post = await Poll.findOne({ comments: { $in: resource_id } })
            }

            if (!post) {
                post = await Job.findOne({ applicants: { $in: resource_id } })
            }

            if (!post) {
                post = await BlogPost.findOne({ comments: { $in: resource_id } })
            }

            const filteredComments = post.comments.filter((comment) => comment._id != resource_id)

            post.comments = filteredComments
            await post.save();

            data = await Comment.findById(resource_id).populate("replies")


            const commentImage = data.commentImage
            const replies = data.replies

            if (commentImage) {
                // Delete Comment image from cloudinary
                await deleteAssetsFromCloudinary(commentImage.public_id)
            }

            replies.forEach(async reply => {

                // Delete Reply Image
                if (reply.replyImage?.public_id) {
                    await deleteAssetsFromCloudinary(reply.replyImage.public_id)
                }

            });

            const replyIds = replies.map(reply => reply._id);

            // Delete replies
            await Reply.deleteMany({
                _id: { $in: replyIds }
            })

            await Comment.deleteOne({ _id: resource_id })

        }

        if (resourceType === "reply") {

            // Remove reply ids from comment
            const comment = await Comment.findOne({ replies: { $in: resource_id } })

            const filteredReplies = comment.replies.filter((reply) => reply._id != resource_id)

            comment.replies = filteredReplies
            await comment.save();

            data = await Reply.findById(resource_id)

            const replyImage = data.replyImage

            if (replyImage) {
                // Delete Reply image from cloudinary
                await deleteAssetsFromCloudinary(replyImage.public_id)
            }

            await Reply.deleteOne({ _id: resource_id })

        }

        if (!data) {
            return NextResponse.json({
                error: 'something went wrong!'
            }, {
                status: 500
            })
        }

        return NextResponse.json({
            data,
            message: `${resourceType} deleted!`
        }, {
            status: 200
        })


    } catch (error) {

        return NextResponse.json({
            error: error.message
        }, {
            status: 200
        })
    }

}