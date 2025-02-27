import BudGroupClient from "./client"

export default function BudGroupServer({ id }: { id: string }) {
	return <BudGroupClient id={id} />
}
