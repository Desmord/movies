const Img = ({ src }: { src: string }) => {
    return (
        <img className="
            rounded-xl 
            object-cover
            w-[300px]
            h-[450px]
            md:w-full
            md:h-auto
            lg:w-full
            lg:aspect-[1/1.66]
            " src={src} alt="movie"></img>
    )
}

export default Img
