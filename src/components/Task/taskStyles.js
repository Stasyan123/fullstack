const taskBase = {
  boxSizing: "border-box",
  boxShadow: "0 2 8 1 rgba(0, 0, 0, 0.1)",
  padding: "1rem"
}

const taskBackground = {
  backgroundColor: "#fffbd1",
}

const taskStyle = {
  ...taskBase,
  ...taskBackground
}

const statusBase = {
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 8,
  marginTop: 5 
}

const statusStyle = {
  finished: {backgroundColor: "#D1FAE5"},
  canceled: {backgroundColor: "red"},
  toDo: {backgroundColor: "yellow"},
  longTerm: {backgroundColor: "#EDE9FE"},
  inProgress: {backgroundColor: "#DBEAFE"},
}

const flexSpaceBetween = {
  display: "flex",
  justifyContent: "space-between"
}

const flexGap10 = {
  display: "flex",
  gap: 10
}

  export default {
    taskStyle,
    taskBase,
    statusBase,
    statusStyle,
    flexSpaceBetween,
    flexGap10
  }