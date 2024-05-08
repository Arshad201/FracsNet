import Link from "next/link"

const NotFound = () => {
  return (
    <div>
        <h1>Not Found</h1>
        <p>sorry, this page is not available in our site</p>
        <Link href={'/'}>Go back to Home Page</Link>
    </div>
  )
}

export default NotFound