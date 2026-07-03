export const documentCategories = [
  "Petitions",
  "Evidence",
  "Court Orders",
  "Judgments",
  "Notices",
  "Affidavits",
  "Agreements",
];

export const documents = [
  { id: "DOC-3001", name: "Original Suit Petition - OS-142-2024.pdf", category: "Petitions", uploadDate: "2024-01-10", caseId: "CASE-2024-001", caseNumber: "OS/142/2024", size: "1.2 MB" },
  { id: "DOC-3002", name: "Survey Settlement Record - Lakdikapul.pdf", category: "Evidence", uploadDate: "2024-03-02", caseId: "CASE-2024-001", caseNumber: "OS/142/2024", size: "3.4 MB" },
  { id: "DOC-3003", name: "Mutual Consent Petition - HMA-87-2024.pdf", category: "Petitions", uploadDate: "2024-02-05", caseId: "CASE-2024-002", caseNumber: "HMA/87/2024", size: "0.8 MB" },
  { id: "DOC-3004", name: "Supply Agreement - Deccan Steel.pdf", category: "Agreements", uploadDate: "2024-03-22", caseId: "CASE-2024-003", caseNumber: "COMM/56/2024", size: "2.1 MB" },
  { id: "DOC-3005", name: "FIR Copy - CRL-229-2024.pdf", category: "Court Orders", uploadDate: "2024-01-26", caseId: "CASE-2024-004", caseNumber: "CRL/229/2024", size: "0.6 MB" },
  { id: "DOC-3006", name: "Final Judgment - OS-98-2023.pdf", category: "Judgments", uploadDate: "2023-12-08", caseId: "CASE-2023-018", caseNumber: "OS/98/2023", size: "1.5 MB" },
  { id: "DOC-3007", name: "Consent Decree - COMM-41-2023.pdf", category: "Judgments", uploadDate: "2023-08-05", caseId: "CASE-2023-022", caseNumber: "COMM/41/2023", size: "0.9 MB" },
  { id: "DOC-3008", name: "Partition Suit Filing - OS-204-2023.pdf", category: "Petitions", uploadDate: "2023-10-12", caseId: "CASE-2023-029", caseNumber: "OS/204/2023", size: "1.1 MB" },
  { id: "DOC-3009", name: "Affidavit of Ramesh Kumar.pdf", category: "Affidavits", uploadDate: "2024-04-18", caseId: "CASE-2024-001", caseNumber: "OS/142/2024", size: "0.4 MB" },
  { id: "DOC-3010", name: "Legal Notice - Alimony Terms.pdf", category: "Notices", uploadDate: "2024-05-22", caseId: "CASE-2024-002", caseNumber: "HMA/87/2024", size: "0.5 MB" },
  { id: "DOC-3011", name: "Interim Injunction Order.pdf", category: "Court Orders", uploadDate: "2024-06-11", caseId: "CASE-2024-003", caseNumber: "COMM/56/2024", size: "0.7 MB" },
  { id: "DOC-3012", name: "Mediation Session Notes.pdf", category: "Evidence", uploadDate: "2025-12-04", caseId: "CASE-2024-003", caseNumber: "COMM/56/2024", size: "1.0 MB" },
  { id: "DOC-3013", name: "Bail Order - CRL-229-2024.pdf", category: "Court Orders", uploadDate: "2024-02-08", caseId: "CASE-2024-004", caseNumber: "CRL/229/2024", size: "0.6 MB" },
  { id: "DOC-3014", name: "Eviction Stay Order.pdf", category: "Court Orders", uploadDate: "2024-01-15", caseId: "CASE-2023-024", caseNumber: "RC/77/2023", size: "0.5 MB" },
  { id: "DOC-3015", name: "Cotton Supply Contract.pdf", category: "Agreements", uploadDate: "2023-09-05", caseId: "CASE-2023-031", caseNumber: "COMM/63/2023", size: "2.3 MB" },
  { id: "DOC-3016", name: "Recovery Suit Decree.pdf", category: "Judgments", uploadDate: "2023-01-30", caseId: "CASE-2022-045", caseNumber: "COMM/29/2022", size: "0.8 MB" },
  { id: "DOC-3017", name: "SARFAESI Quashing Order.pdf", category: "Court Orders", uploadDate: "2022-09-14", caseId: "CASE-2022-011", caseNumber: "OS/55/2022", size: "0.9 MB" },
];

export const getDocumentsByCase = (caseId) => documents.filter((d) => d.caseId === caseId);
