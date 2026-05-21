import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { API } from "../services/api";

const cols = ["todo", "in-progress", "done"];

export default function Kanban({ tasks, setTasks }) {
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updated = tasks.map((t) =>
      t._id === result.draggableId
        ? { ...t, status: result.destination.droppableId }
        : t
    );

    setTasks(updated);

    await API.put(`/tasks/${result.draggableId}`, {
      status: result.destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {cols.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(p) => (
              <div
                ref={p.innerRef}
                {...p.droppableProps}
                className="bg-white p-4 rounded shadow"
              >
                <h2 className="text-xl font-semibold mb-3 capitalize">
                  {col}
                </h2>

                {tasks
                  .filter((t) => t.status === col)
                  .map((t, i) => (
                    <Draggable key={t._id} draggableId={t._id} index={i}>
                      {(p) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                          className="bg-gray-200 p-3 rounded mb-2"
                        >
                          {t.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                {p.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}