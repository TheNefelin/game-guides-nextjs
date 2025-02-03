import TimelineAdventureCheck from "./TimelineAdventureCheck"
import { Adventure } from "@/services/models"
import TimelineAdventureImg from "./TimelineAdventureImg"

interface AdventureProps {
  adventures: Adventure[]
}

export default function TimelineAdventure({ adventures }: AdventureProps) {
  return (
    adventures.map((adventure: Adventure) => (
      <span key={adventure.id}>
        {adventure.isImportant ? 
          // <p>✓ {adventure.description}</p>
          <TimelineAdventureCheck adventuresUser={ adventure.adventureUser} description={ adventure.description }/>
        :
          <p>✓ {adventure.description}</p>
        }

        <TimelineAdventureImg adventuresImg={ adventure.adventuresImg }/>
      </span>
    ))
  )
}