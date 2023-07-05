export default async function getNotifications() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/user/notifs`,
		{
			method: 'GET',
			credentials: 'include',
		}
	);
	const data = await response.json();
	return data;
}

export async function modifyNotifs(notifId: string, action: 'read' | 'delete') {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/notifs`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notifId, action }),
    }
  );
  const data = await response.json();
  return data;
}