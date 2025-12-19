import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from 'form-data'

export const generateImage = async (req, res) =>{
    try{

        const {userId, prompt} = req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({ success: false, message: 'Missing Details' })
        }

        if(user.creditBalance == 0 || userModel.creditBalance < 0){
            return res.json({ success: false, message: 'No Credit Balance', creditBalabnce: user.creditBalance })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const{data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', 
            formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })  

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creditBalance:user.creditBalance - 1})

        res.json({success: true, message: "Image Generated",
            creditBalance: user.creditBalance - 1, resultImage })

    }catch (error){
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


/*import axios from "axios"
import userModel from "../models/userModel.js"

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body

    const user = await userModel.findById(userId)
    if (!user || !prompt)
      return res.json({ success: false, message: "Missing Details" })

    if (user.creditBalance <= 0)
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      })

    // ✅ Hugging Face API call
    const response = await axios.post(
      "https://api.lightxeditor.com/external/api/v2/text2image",
      { inputs: prompt }, // <--- must be "inputs"
      {
        headers: {
          'x-api-key': process.env.LIGHTX_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    )

    const base64Image = Buffer.from(response.data, "binary").toString("base64")
    const resultImage = `data:image/png;base64,${base64Image}`

    // Deduct credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    })

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    })
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.json({
      success: false,
      message: error.response?.data?.error || "Image generation failed",
    })
  }
}*/


