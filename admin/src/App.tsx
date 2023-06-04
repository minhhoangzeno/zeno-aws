import loadable from "@loadable/component";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalLoading from "./components/global-loading/GlobalLoading";

const File = loadable(() => import("./pages"));

function App() {
    return (
        <div className="App">
            <BrowserRouter basename={""}>
                <Suspense fallback={<GlobalLoading />}>
                    <Routes>
                        <Route path="/" element={<File />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
