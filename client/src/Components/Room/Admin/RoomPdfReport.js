import jsPDF from 'jspdf';
import "jspdf-autotable";

const RoomPdfReport = room => {

    const payDoc = new jsPDF();

    const tableColumn = ["Name", "E-mail Address", "Room Name", "Check-in date", "Check-out date", "Total Days", "Payment"];
    const tableRows = [];

    room.forEach(room => {
        const transactionData = [
            room.Fullname,
            room.email,
            room.room,
            room.fromdate,
            room.todate,
            room.totDates,
            room.totAmount,
        ];
        
        tableRows.push(transactionData);
    });

    payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
    payDoc.text("All Room Bookings Report", 14, 15);
    payDoc.save(`AllBooking.pdf`);
};

export default RoomPdfReport;