import { Guide } from "@/services/models"
import BtnUpGuide from "./BtnUpGuide"
import TimelineAdventure from "./TimelineAdventure"
import TimelineGuideCheck from "./TimelineGuideCheck"

interface GuideProps {
  guides: Guide[]
}

export default function TimelineGuide({ guides }: GuideProps) {
  return (
    guides.map((guide: Guide, index: number) => (
      <div key={guide.guide_Id} className="collapse collapse-arrow bg-base-200 mb-2 shadow-md">
      <input type="checkbox" />
        <div id={`G-${guide.guide_Id}`} className={`collapse-title text-lg font-medium`}>
          {`${index + 1}.- ${guide.name}`}
        </div>

        <div key={guide.guide_Id} className="collapse-content">
          <TimelineGuideCheck guideUser={guide.guideUser}/>
          <TimelineAdventure adventures={ guide.adventures }/>
          <BtnUpGuide id_guia_acordion={`G-${guide.guide_Id}`}/>
        </div>
      </div>
    ))
  )
}