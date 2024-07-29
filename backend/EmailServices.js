export const FetchEmails = async (category) => {
    try {
      const response = await fetch(`https://localhost:5000/api/emails/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} emails`);
      }
      const emails = await response.json();
      return emails;
    } catch (error) {
      console.error(`Error fetching ${category} emails:`, error.message);
      throw error;
    }
  };
  
