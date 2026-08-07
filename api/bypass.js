export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Logika dasar melacak redirect link (bisa dikustomisasi dengan logika ekstrak token/API pihak ketiga jika diperlukan)
        const response = await fetch(url, { 
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
        
        const finalDestination = response.url;

        return res.status(200).json({ 
            status: 'success', 
            destination: finalDestination 
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to process link' });
    }
}

