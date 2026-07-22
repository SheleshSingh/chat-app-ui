import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/Divider"
import IconButton from "../shared/IconButton"

const Post = () => {
  return (
    <div className="space-y-8">
      {
        Array(20).fill(0).map((item, index) => (
          <Card key={index}>
            <div className="space-y-3">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus commodi eos animi tempore iste nam odio labore ullam asperiores, aut ad in cupiditate enim corporis illum vitae exercitationem beatae aspernatur?
              </p>
              <div className="flex justify-between items-center">
                <label className="text-sm">june 8, 2026 8:00 Pm</label>
                <div className="space-x-4">
                  <IconButton type="info" icon="edit-line" />
                  <IconButton type="danger" icon="delete-bin-4-line" />
                </div>
              </div>
              <Divider />
              <div className="space-x-4">
                <Button size="sm" type="info" icon="thumb-up-line">20k</Button>
                <Button size="sm" type="warning" icon="thumb-down-line">20k</Button>
                <Button size="sm" type="danger" icon="chat-ai-line">20k</Button>
              </div>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Post