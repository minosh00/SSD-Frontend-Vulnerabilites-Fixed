import jsPDF from 'jspdf';
import "jspdf-autotable";

const RoomReport = room => {

    const payDoc = new jsPDF();

    const tableColumn = ["Name", "E-mail Address", "Room Name", "Check-in date", "Check-out date", "Payment(LKR)"];
    const tableRows = [];

    room.forEach(room => {
        const transactionData = [
            room.Fullname,
            room.email,
            room.room,
            room.fromdate,
            room.todate,
            room.totAmount,
        ];
        
        tableRows.push(transactionData);
    });

    payDoc.autoTable(tableColumn, tableRows, { startY: 20 });
    payDoc.text("Room Bookings Receipt", 14, 15);
    payDoc.save(`Booking.pdf`);
};

export default RoomReport;