// src/components/ReportsLayout/ReportsLayout.js
import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const reports = [
    {
      serialNumber: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Cardiology',
      reportFile: '/patient_report.pdf',
    },
    {
      serialNumber: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Dermatology',
      reportFile: '/patient_report.pdf',
    },
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.serialNumber}>
              <td>{report.serialNumber}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a
                  href={report.reportFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Report
                </a>
              </td>
              <td>
                <a
                  href={report.reportFile}
                  download
                  className="download-btn"
                >
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
