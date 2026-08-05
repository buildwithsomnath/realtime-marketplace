const Avatar = ({
    src,
    name,
    size = 48,
}) => {
    return (
        <img
            src={
                src ||
                `https://ui-avatars.com/api/?name=${name}`
            }
            alt={name}
            style={{
                width: size,
                height: size,
            }}
            className="rounded-full object-cover"
        />
    );
};

export default Avatar;