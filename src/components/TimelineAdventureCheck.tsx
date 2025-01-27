interface AdventureCheckProps {
  description: string,
}

export default function TimelineAdventureCheck({ description }: AdventureCheckProps) {
  return (
    <div className='bg-error-content text-white p-2'>
      <div className="form-control">
        <label className="cursor-pointer flex">
          <input type="checkbox" className="checkbox checkbox-accent mt-2" />
          <label className='label'>{ description }</label>
        </label>
      </div> 
    </div>
  )
}