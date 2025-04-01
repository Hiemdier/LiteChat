import { Router } from "express";
import { authenticateToken } from "../../middleware/auth";
import { Chatroom, Member, Message } from "../../models"; // Assuming Sequelize models are defined here
import { Sequelize } from "sequelize";

const router = Router();

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

        // Fetch chatrooms with Sequelize
        const rooms = await Chatroom.findAll({
            include: [
                {
                    model: Member,
                    where: { user_id: userId },
                    attributes: [], // Exclude Member attributes
                },
                {
                    model: Message,
                    attributes: ["content"],
                    order: [["created_at", "DESC"]],
                    limit: 1,
                },
            ],
            attributes: [
                "id",
                "name",
                "created_at",
                [
                    // Subquery for member count
                    Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM room_members AS rm
                        WHERE rm.room_id = chatroom.id
                    )`),
                    "member_count",
                ],
            ],
            order: [["created_at", "DESC"]],
            limit,
            offset,
        });

        return res.json({ rooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
