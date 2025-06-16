import { useState } from "react"

function CategoryChildren({ categoryChildren }) {
  const [openChild, setOpenChild] = useState(false)
  return (
    <div style={{ marginLeft: '20px' }}>
      {categoryChildren && categoryChildren.length > 0 &&
        categoryChildren.map((item, index: number) => (
          <div key={index}>
            <div className="flex gap-2">
              <p>{item._id}</p>
              <p>{item.name}</p>
              {item.children.length > 0 && <button onClick={() => setOpenChild(!openChild)}>+</button>}
            </div>
            {
              openChild && item.children.length > 0 && (
                <CategoryChildren
                  key={index}
                  categoryChildren={item.children}
                />
              )
            }
          </div>
        ))}
    </div>
  )
}

export default CategoryChildren