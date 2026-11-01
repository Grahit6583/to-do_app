
const BASE_URL = "https://api.mymemory.translated.net/get";

export const translateText = async (
    text: string,
    targetLanguage: string
): Promise<string> => {

    const params = new URLSearchParams({
        q: text,
        langpair: `en|${targetLanguage}`
    });

    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
        throw new Error("Translation request failed");
    }

    const data = await response.json();

    if (data.responseStatus !== 200) {
        throw new Error("Translation failed");
    }

    return data.responseData.translatedText;
};
