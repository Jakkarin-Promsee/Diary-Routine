import { useState } from "react"

function HelloWorld(){
    const [hel, setHel] = useState("Hi")

    return <h1>{hel}, Hello world</h1>
}

export default HelloWorld