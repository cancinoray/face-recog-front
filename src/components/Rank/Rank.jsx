const Rank = ({entries, name}) => {
  return (
    <div className="flex-column">
      <div className='center white f3'>
        {`${name} , your current entry count is...`}
      </div>
      <div className='center white f1'>
        { entries}
      </div>
    </div>
  )
}

export default Rank
