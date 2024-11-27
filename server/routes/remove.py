from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from typing import Annotated
from PIL import Image
from io import BytesIO
from rembg import remove

remove_router = APIRouter()


@remove_router.post("/")
async def remove_bg(file: UploadFile = File(...)):

    if file.content_type not in ["image/jpeg", "image/png", "image/gif", "image/jpg"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type: Only JPEG, PNG, and GIF images are allowed.",
        )

    files_byte = await file.read()

    image = Image.open(BytesIO(files_byte))

    image_without_bg = remove(image)

    # Save the image to a BytesIO object
    img_bytes = BytesIO()
    image_without_bg.save(img_bytes, format="PNG")
    img_bytes.seek(0)

    return StreamingResponse(img_bytes, media_type="image/png")
