import { ObjectId } from 'mongodb';

export function convertToObjectId(id: string): ObjectId {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
    }
    return new ObjectId(id);
}
