export function templateEvent(username, startDay, startTime, title): string {
  const text = `Hi ${username},

  There are only some hour  left before the ${title}!
  
  The best  leaders will share their secrets and give you an insight into the techniques they’ve used for years to achieve specific goals.

  See the Agenda
  
  WHEN: [${startDay}, ${startTime}]
  WHERE: Online. We’ll be hosting live sessions and releasing [x] on-demand videos that you can watch whenever you want throughout the day.
  
  Don’t forget to mark your calendar, and let us know if you have any questions.
  
  Hope to see you there!`;
  return text;
}
