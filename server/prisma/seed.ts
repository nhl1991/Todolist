// 개발 DB용 더미 데이터. 실행: npx prisma db seed
// 시드 계정 이외의 사용자가 있는 DB(운영 DB 등)에서는 아무것도 하지 않고 중단한다.
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const PASSWORD = 'password1234';

const USERS = [
  { email: 'dev01@example.com', username: 'devuser01' },
  { email: 'dev02@example.com', username: 'devuser02' },
  { email: 'dev03@example.com', username: 'devuser03' },
];

const LONG_PRESENTATION = [
  '来週の定例会議で使うプレゼン資料を準備する。',
  '・先月の売上推移グラフを更新',
  '・新機能のスクリーンショットを差し替え',
  '・質疑応答で聞かれそうな点をメモにまとめる',
  '・発表時間は15分以内に収まるように構成を見直す',
  '最後に一度通しでリハーサルして、話す順番と時間配分を確認すること。',
].join('\n');

const LONG_TRIP = [
  '夏休みの旅行計画。候補は京都と金沢。',
  '交通手段は新幹線の早割を使えるか調べる。宿は駅から徒歩圏内で、朝食付きのところを優先。',
  '一日目は寺社巡り、二日目は市場で食べ歩き、三日目はお土産を買って早めに帰る予定。',
  '雨の日のために美術館や博物館の候補もいくつか調べておく。予算は一人あたり五万円まで。',
].join('\n');

// [title, content, authorIndex]
const PUBLIC_TODOS: [string, string, number][] = [
  ['牛乳を買う', '帰りにスーパーで牛乳と卵を買う。', 0],
  ['週次レポート作成', '金曜日までに今週の進捗をまとめて提出する。', 1],
  ['ジムに行く', '夜7時から1時間。ストレッチを忘れずに。', 2],
  ['本を30ページ読む', '寝る前に読書の時間を作る。', 0],
  ['部屋の掃除', '机の上と本棚を片付ける。', 1],
  ['歯医者の予約', '来週の平日午前で空いている日を探す。', 2],
  ['Reactの復習', 'useEffectとuseActionStateの使い方を見直す。', 0],
  ['洗濯物を取り込む', '雨が降る前に取り込むこと。', 1],
  ['請求書の支払い', '電気代とネット料金を今月中に支払う。', 2],
  ['ランニング5km', '朝の涼しい時間に川沿いを走る。', 0],
  ['プレゼン資料の準備', LONG_PRESENTATION, 1],
  ['植物に水やり', 'ベランダの鉢植えに水をあげる。', 2],
  ['英単語を20個覚える', '通勤時間にアプリで復習する。', 0],
  ['冷蔵庫の整理', '賞味期限の切れたものを処分する。', 1],
  ['誕生日プレゼント選び', '友人の誕生日が来月なので候補を三つに絞る。', 2],
  ['Prismaのドキュメント確認', 'マイグレーションとシードの章を読む。', 0],
  ['自転車の空気入れ', '前輪の空気が減っているので補充する。', 1],
  ['夕食の献立を決める', '冷蔵庫の残り物で作れるものを考える。', 2],
  ['メールの返信', '未返信のメールを今日中に片付ける。', 0],
  ['写真の整理', 'スマホの写真をアルバムごとに分ける。', 1],
  ['ギターの練習', 'コードチェンジを30分練習する。', 2],
  ['旅行の計画を立てる', LONG_TRIP, 0],
  ['古い服を寄付する', '着なくなった服を袋にまとめる。', 1],
  ['NestJSのテスト追加', 'ログインAPIのe2eテストを書く。', 2],
  ['週末の買い出し', '日用品とお米をまとめて買う。', 0],
];

const PRIVATE_TODOS: [string, string, number][] = [
  ['家計簿をつける', '今月の支出をカテゴリ別に集計する。', 0],
  ['パスワードの見直し', '使い回しているパスワードを変更する。', 0],
  ['日記を書く', '今日あったことを三行で書く。', 1],
  ['健康診断の結果確認', '再検査が必要な項目がないか確認する。', 1],
  ['転職サイトの確認', '新着の求人をチェックする。', 2],
  ['秘密のメモ', '他のユーザーからは見えないはずのメモ。', 2],
];

function assertLengths(todos: [string, string, number][]) {
  for (const [title, content] of todos) {
    if (title.length < 1 || title.length > 20) throw new Error(`title length out of range: ${title}`);
    if (content.length < 1 || content.length > 250) throw new Error(`content length out of range: ${title}`);
  }
}

async function main() {
  assertLengths([...PUBLIC_TODOS, ...PRIVATE_TODOS]);

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const seedEmails = USERS.map((u) => u.email);
    const others = await prisma.user.count({ where: { email: { notIn: seedEmails } } });
    if (others > 0) {
      throw new Error(
        `시드 계정이 아닌 사용자 ${others}명이 있는 DB입니다. 운영 DB일 수 있으므로 중단합니다. DATABASE_URL을 확인하세요.`,
      );
    }

    const hash = await bcrypt.hash(PASSWORD, 10);
    const users = await Promise.all(
      USERS.map((u) =>
        prisma.user.upsert({
          where: { email: u.email },
          update: { username: u.username, password: hash },
          create: { ...u, password: hash },
        }),
      ),
    );

    // 최신 글이 먼저 보이도록 목록 순서대로 1시간씩 과거로 배치
    const now = Date.now();
    const toRow = ([title, content, author]: [string, string, number], isPublic: boolean, i: number) => ({
      title,
      content,
      published: true,
      public: isPublic,
      authorId: users[author].id,
      createdDt: new Date(now - i * 60 * 60 * 1000),
    });
    const rows = [
      ...PUBLIC_TODOS.map((t, i) => toRow(t, true, i)),
      ...PRIVATE_TODOS.map((t, i) => toRow(t, false, PUBLIC_TODOS.length + i)),
    ];

    await prisma.$transaction([
      prisma.todo.deleteMany({ where: { authorId: { in: users.map((u) => u.id) } } }),
      prisma.todo.createMany({ data: rows }),
    ]);

    console.log(
      `시드 완료: 사용자 ${users.length}명, 공개 글 ${PUBLIC_TODOS.length}개, 비공개 글 ${PRIVATE_TODOS.length}개 (비밀번호: ${PASSWORD})`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
