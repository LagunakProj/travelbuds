import BudGroupServer from "./components/server"

export default async function BudGroupBudGroup({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id

	return <BudGroupServer id={id} />
}
