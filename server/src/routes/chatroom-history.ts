import { Router } from "express";
import { Pool } from "pg";
import { authenticateToken } from "../middleware/auth";

const router = Router();
const pool = new Pool();

// GET /api/chatrooms - Get rooms the user is a member of
router.get("/chatrooms", authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Pagination (default to page 1, limit 10)
        const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);
        const offset = (page - 1) * limit;

        // Valid SQL Query
        const query = `
            SELECT 
                r.id, 
                r.name, 
                r.created_at,
                (SELECT COUNT(*) FROM room_members rm WHERE rm.room_id = r.id) AS member_count,
                (SELECT message FROM messages m WHERE m.chatroom_id = r.id ORDER BY m.created_at DESC LIMIT 1) AS last_message
            FROM chatroom r
            JOIN room_members rm ON r.id = rm.room_id
            WHERE rm.user_id = $1
            ORDER BY r.created_at DESC
            LIMIT $2 OFFSET $3;
        `;

        const { rows } = await pool.query(query, [userId, limit, offset]);

        return res.json({ rooms: rows });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
