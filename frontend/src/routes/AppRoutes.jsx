import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import QRGenerator from "../pages/QRGenerator";
import PasswordGenerator from "../pages/PasswordGenerator";
import UrlShortener from "../pages/UrlShortener";
import PDFToolkit from "../pages/PDFToolkit";
import ImageEditor from "../pages/ImageEditor";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import VideoDownloader from "../pages/VideoDownloader";
import CodeFormatter from "../pages/CodeFormatter";
import MusicEditor from "../pages/MusicEditor";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }
          />

          <Route
            path="/qr-generator"
            element={
            <ProtectedRoute>
              <QRGenerator />
            </ProtectedRoute>
            }
          />

          <Route
            path="/password-generator"
            element={
            <ProtectedRoute>
              <PasswordGenerator />
            </ProtectedRoute>
            }
          />

          <Route
            path="/url-shortener"
            element={
            <ProtectedRoute>
              <UrlShortener />
            </ProtectedRoute>
            }
          />

          <Route
            path="/pdf-tools"
            element={
            <ProtectedRoute>
              <PDFToolkit />
            </ProtectedRoute>
            }
          />

         <Route
            path="/image-editor"
            element={
            <ProtectedRoute>
              <ImageEditor />
            </ProtectedRoute>
            }
          />

          <Route
            path="/resume-analyzer"
            element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
            }
          />

          <Route
            path="/video-downloader"
            element={
            <ProtectedRoute>
              <VideoDownloader />
            </ProtectedRoute>
            }
          />

          <Route
            path="/code-tools"
            element={
            <ProtectedRoute>
              <CodeFormatter />
            </ProtectedRoute>
            }
          />

          <Route
            path="/music-editor"
            element={
            <ProtectedRoute>
              <MusicEditor />
            </ProtectedRoute>
            } 
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}

export default AppRoutes;