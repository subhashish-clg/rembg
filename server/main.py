from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routes
from routes.remove import remove_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,  # Allow cookies or authentication headers
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {
        "version": "v0.0.1",
        "name": "Remove BG Server"
    }


app.include_router(remove_router, prefix="/remove")
