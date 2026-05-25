const ParticipantsInfo = ({ roomId, usersCount }) => {
    return (
        <div className="participants-info">
            <h2>Room: {roomId}</h2>
            <p>Users in room: {usersCount}</p>
            <p>You are successfully connected.</p>
        </div>
    );
};

export default ParticipantsInfo;