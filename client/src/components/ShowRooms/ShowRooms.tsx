interface Props {
  children: React.ReactNode;
  showRoom: boolean;
}

export const ShowRooms = ({ children, showRoom }: Props) => {
  return (
    <>
      {
        showRoom
          ? children
          : <h2 className="h2-acceder">Accede a la sala que más te guste</h2>
      }
    </>
  )
}