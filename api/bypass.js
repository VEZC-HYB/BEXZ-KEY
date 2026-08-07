export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Menggunakan API pihak ketiga yang khusus memproses link pendek
        const apiResponse = await fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`);
        const data = await apiResponse.json();

        const destination = data.destination || data.result;

        if (destination) {
            return res.status(200).json({ 
                status: 'success', 
                destination: destination 
            });
        } else {
            return res.status(400).json({ error: 'Failed to bypass this link.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
