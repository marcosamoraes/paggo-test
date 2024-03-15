'use client'

import Logo from "@/components/Logo"
import Button from "@/components/UI/Button"
import { IoMdSend } from "react-icons/io"

export default function Home() {

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get("file"))
    // const response = await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData
    // })
    // const data = await response.json()
    // console.log(data)
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 gap-20">
      <header className="flex flex-col items-center gap-6">
        <Logo />
        <h2 className="text-2xl">Upload your invoice and we&apos;ll do the rest.</h2> 
      </header>

      <form className="flex flex-col gap-4" encType="multipart/form-data" method="post" onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          className="p-2 border border-gray-300 rounded-lg"
          name="file"
        />

        <Button type="submit" Icon={IoMdSend}>Send Invoice</Button>
      </form>
    </main>
  );
}
