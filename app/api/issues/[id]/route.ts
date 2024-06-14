import {  patchIssueSchema } from "@/app/validateSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: {params: { id: string }}
    ){
    // const session = await auth();
    // if(!session) return NextResponse.json({}, {status: 401});

    const body = await request.json();
    const { title, description, assignedToUserId, status } = body;
    const validation = patchIssueSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400});

    if( assignedToUserId ){
        const user = await prisma.user.findUnique({where: { id: assignedToUserId}});
        if(!user) return NextResponse.json({error: 'Invalid user'}, {status: 400});
    }

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) }});
    if(!issue) return NextResponse.json({error: 'Invalid issue'}, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId,
            status
        }
    });
    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: {id: string}}){
    const issue = await prisma.issue.findUnique(
        {where: {id: parseInt(params.id)}}
    );

    const session = await auth();
    if(!session) return NextResponse.json({}, {status: 401});

    if(!issue) return NextResponse.json({error: 'Invalid issue'}, {status: 404});

    const deletedIssue = await prisma.issue.delete({where: { id: issue.id}});

    return NextResponse.json({deletedIssue});
}