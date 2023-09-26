import jsPDF from 'jspdf';
import "jspdf-autotable";

const UsersReport = users => {

    const payDoc = new jsPDF();

    const tableColumn = ["Full Name" , "Phone Number" , "E-mail Address", "User Role"];
    const tableRows = [];
    users.forEach(users => {
        const transactionData = [
            users.Fullname,
            users.pNumber,
            users.email,
            users.userRole
        ];
        tableRows.push(transactionData);
    });

    payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
    payDoc.text("All Users Report", 14, 15);
    payDoc.save(`AllUsers.pdf`);
};

export default UsersReport;