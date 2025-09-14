export interface IBooking {
		id: string;
		date: string;
		startTime: string;
		endTime: string;
		status: string;
		createdAt: string;
		updatedAt: string;
		user: {
      id: string;
			name: string;
			role: string;
      canScheduling: boolean;
      canViewLogs: boolean
		},
		room: {
			name: string;
      id: string;
		}
}
export interface ICreateBooking {
  roomId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
}