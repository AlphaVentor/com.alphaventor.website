

BeCodebase codebase = BeCodebase.from(MyStorageEntry.class);

MyStorageEntry e00 = new MyStorageEntry("id0x0023");
e00.shuffle();

MyStorageEntry e01 = (MyStorageEntry) codebase.getType(e00).deepClone(e00);
e01.quantity = 24;
e01.longitude = 240.8979;

BeType type = codebase.getType(e00);

Writer writer = new PrintWriter(System.out);
type.deepCompare(e00, e01, writer);
writer.close();
		
BeField field = type.getField("quantity");
if(field.hasDiff(e00, e01)) {
	System.out.println(field.produceDiff(e01).toString());
}
