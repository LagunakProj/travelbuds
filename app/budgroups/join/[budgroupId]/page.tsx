"use client";

import { notFound } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { use } from "react";

export default function Page({
	params,
}: {
	params: Promise<{ budgroupId: string }>;
}) {
	const { budgroupId } = use(params);

	const { user, isSignedIn } = useUser();

	useEffect(() => {
		if (!isSignedIn) return;

		const fetchGroup = async () => {
			const response = await fetch(
				"/api/budgroups/join?budgroupId=" +
					budgroupId +
					"&userId=" +
					user.id
			);
			const data = await response.json();
			console.log(data);
		};
		fetchGroup();
	}, [budgroupId]);

	if (!budgroupId) {
		return notFound(); // Manejo de error si el ID no es válido
	}

	return (
		<div>
			<h1>Unirse al Grupo</h1>
			<p>Estás intentando unirte al grupo con ID: {budgroupId}</p>
		</div>
	);
}
