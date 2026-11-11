import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import HistoryPage from './pages/HistoryPage';
import DataOverviewPage from './pages/DataOverviewPage';
import EdaPage from './pages/EdaPage';
import FuzzyModelPage from './pages/FuzzyModelPage';
import CustomerAnalysisPage from './pages/CustomerAnalysisPage';
import CustomerInsightsPage from './pages/CustomerInsightsPage';
import CustomerDetailPage from './pages/CustomerDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Authentication Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Layout Routes with Shared Sidebar & Topbar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analysis/overview" element={<DataOverviewPage />} />
          <Route path="/analysis/eda" element={<EdaPage />} />
          <Route path="/analysis/model" element={<FuzzyModelPage />} />
          <Route path="/analysis/customers" element={<CustomerAnalysisPage />} />
          <Route path="/analysis/insights" element={<CustomerInsightsPage />} />
          <Route path="/analysis/customer-detail" element={<CustomerDetailPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
