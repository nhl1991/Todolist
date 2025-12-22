

export default function Main({children} : {children:React.ReactNode}){


    return(
        
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 md:px-16 px-8 rounded-xl box-shadow">
        {children}
      </main>
    )
}