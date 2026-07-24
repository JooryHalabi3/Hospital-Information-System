const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const db = require("./db");

// تحميل متغيرات البيئة
dotenv.config();

// تهيئة التطبيق
const app = express();

// ميدل وير
app.use(cors());
app.use(bodyParser.json());

// 🟢 تهيئة الجلسات
app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.use((req, res, next) => {
  console.log("🔐 جلسة المستخدم:", req.session.user);
  next();
});

// ملفات ثابتة
app.use(express.static(path.join(__dirname, "/public")));

// الصفحة الرئيسية -> تفتح واجهة home مباشرة
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "home.html"));
});

// متغيرات عامة
global.recoveryCodes = {};

// ربط المسارات
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const patientHomeRoute = require("./routes/patientHome");
const userInfoRoute = require("./routes/userInfo");
const employeeHomeRoute = require("./routes/employeeHome");
const publicDataRoutes = require("./routes/publicData");
const adminRoutes = require("./routes/admin");
const communicationRoutes = require("./routes/communication");
const evaluationRoutes = require("./routes/evaluation");
const checkSessionRoute = require("./routes/checkSession");

app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/patient-home", patientHomeRoute);
app.use("/api/user-info", userInfoRoute);
app.use("/api/employee-home", employeeHomeRoute);
app.use("/api", publicDataRoutes);       // /api/policies, /api/services
app.use("/api/admin", adminRoutes);      // /api/admin/policies, /api/admin/services
app.use("/api/communication", communicationRoutes); // /api/communication/send-message
app.use("/api/evaluation", evaluationRoutes);        // /api/evaluation
app.use("/api", checkSessionRoute);      // /api/check-session

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});