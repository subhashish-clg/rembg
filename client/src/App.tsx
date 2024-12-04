import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <>
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-5xl font-bold uppercase tracking-tighter text-blue-600 mb-2">
          Remove Background
        </h1>
        <p>Remove background from your images</p>
      </div>

      <main className="flex justify-center mt-12">
        <ImageSlider />
      </main>
    </>
  );
}

export default App;
